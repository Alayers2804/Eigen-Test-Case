
export default {
  Base: '/api',
  Users: {
    Base: '/member',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Books: {
    Base: '/book',
    Get: '/',
    Add: '/',
    Update: '/',
    Delete: '/:code',
  }
} as const;
