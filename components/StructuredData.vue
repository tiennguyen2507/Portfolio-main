<template>
  <div></div>
</template>

<script setup>
// Structured Data for SEO
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nguyễn Lê Đình Tiên",
        jobTitle: "Fullstack Web Developer",
        description:
          "Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development",
        url: "https://nguyenledinhtien.io.vn",
        image: "https://nguyenledinhtien.io.vn/assets/images/IMG_6220.png",
        email: "Nguyenledinhtien2507@gmail.com",
        telephone: "+84 88 669 4350",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Da Nang",
          addressCountry: "VN",
        },
        sameAs: [
          "https://github.com/nguyenledinhtien",
          "https://linkedin.com/in/nguyenledinhtien",
        ],
        knowsAbout: [
          "Frontend Development",
          "Backend Development",
          "React",
          "Vue.js",
          "Node.js",
          "NestJS",
          "TypeScript",
          "JavaScript",
          "API Development",
          "Modern UI/UX",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Freelance Developer",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Nguyễn Lê Đình Tiên Portfolio",
        url: "https://nguyenledinhtien.io.vn",
        description:
          "Portfolio của Nguyễn Lê Đình Tiên - Fullstack Web Developer",
        author: {
          "@type": "Person",
          name: "Nguyễn Lê Đình Tiên",
        },
        publisher: {
          "@type": "Person",
          name: "Nguyễn Lê Đình Tiên",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Web Development Services",
        provider: {
          "@type": "Person",
          name: "Nguyễn Lê Đình Tiên",
        },
        description:
          "Dịch vụ phát triển web fullstack với React, Vue.js, Node.js và NestJS",
        areaServed: {
          "@type": "Country",
          name: "Vietnam",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Frontend Development",
                description: "Modern UI/UX with Vue.js & React",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Backend Development",
                description: "Robust APIs with Node.js & NestJS",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Server Deployment",
                description: "Cloud infrastructure & DevOps",
              },
            },
          ],
        },
      }),
    },
  ],
});
</script>
