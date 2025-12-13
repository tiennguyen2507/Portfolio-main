// Admin navigation menu items
export const adminMenuItems = [
  {
    path: '/admin/users',
    label: 'Quản lý người dùng',
    icon: 'users',
  },
  {
    path: '/admin/contacts',
    label: 'Quản lý liên hệ',
    icon: 'contacts',
  },
  {
    path: '/admin/blogs',
    label: 'Quản lý bài viết',
    icon: 'blogs',
  },
  {
    path: '/admin/projects',
    label: 'Quản lý dự án',
    icon: 'projects',
  },
]

// Icon configuration constants
export const ICON_CONFIG = {
  SIZE: 28,
  ACTIVE_STROKE_WIDTH: 2.5,
  INACTIVE_STROKE_WIDTH: 2,
  ACTIVE_COLOR: 'text-white',
  INACTIVE_COLOR: 'text-gray-700',
}

// Admin base path
export const ADMIN_BASE_PATH = '/admin'
