export const SCROLL_LOCKING_ATTRIBUTE = 'data-lock-scrolling';

export default class ScrollLockManager {
  private scrollLocks: number = 0;
  private body = document.body;

  registerScrollLock() {
    this.scrollLocks += 1;
    this.handleScrollLocking();
  }

  unregisterScrollLock() {
    this.scrollLocks -= 1;
    this.handleScrollLocking();
  }

  handleScrollLocking() {
    const {scrollLocks, body} = this;
    if (scrollLocks === 0) {
      body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
      body.removeAttribute('style');
    } else if (scrollLocks > 0) {
      const scrollPosition = window.scrollY;

      body.style.paddingRight = `${scrollBarPadding()}px`;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, '');
      body.scrollTop = scrollPosition;
    }
  }
}

function scrollBarPadding(): number {
  if (!document || !window) return 0;

  const paddingRight = document.body.style.paddingRight || '0';

  const currentPadding = parseInt(paddingRight, 10) || 0;
  const clientWidth = document.body ? document.body.clientWidth : 0;
  const adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;

  return adjustedPadding;
}
