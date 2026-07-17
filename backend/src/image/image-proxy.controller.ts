import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import * as express from 'express';
import axios from 'axios';

@Controller('image')
export class ImageProxyController {
  @Post('proxy-image-encoded')
  async getProxyUrl(
    @Body('encodedUrl') encodedUrl: string,
    @Req() req: express.Request,
  ) {
    if (!encodedUrl) {
      throw new BadRequestException('encodedUrl không được để trống');
    }

    try {
      const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

      // Determine the base URL dynamically based on the incoming request
      const protocol =
        req.secure || req.headers['x-forwarded-proto'] === 'https'
          ? 'https'
          : 'http';
      const host = req.headers.host;
      const proxyUrl = `${protocol}://${host}/image/stream?url=${encodeURIComponent(decodedUrl)}`;

      return { url: proxyUrl };
    } catch {
      throw new BadRequestException('Không thể giải mã encodedUrl');
    }
  }

  @Get('stream')
  async streamImage(
    @Query('url') targetUrl: string,
    @Res() res: express.Response,
  ) {
    if (!targetUrl) {
      throw new BadRequestException('Thiếu tham số url');
    }

    try {
      console.log('Proxy streaming image:', targetUrl);
      const response = await axios({
        method: 'get',
        url: targetUrl,
        responseType: 'stream',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000,
      });

      // Forward content type
      const contentType = String(
        response.headers['content-type'] || 'image/jpeg',
      );
      res.setHeader('Content-Type', contentType);

      // Cache proxy image response for 1 day
      res.setHeader('Cache-Control', 'public, max-age=86400');

      // Pipe the stream
      response.data.pipe(res);
    } catch (error) {
      console.error('Error proxying image:', error.message);
      res.status(500).send('Không thể tải hình ảnh từ proxy');
    }
  }
}
