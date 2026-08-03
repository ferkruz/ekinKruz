export type ContactPageMotionCleanup = () => void;

export async function setupContactPageMotion(
  root: HTMLElement,
  reducedMotion: boolean,
): Promise<ContactPageMotionCleanup> {
  if (typeof window === 'undefined' || reducedMotion) return () => undefined;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    gsap.fromTo(
      root.querySelector('.ek-contact-hero__visual'),
      { autoAlpha: 0, y: 24, filter: 'blur(12px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        delay: 0.12,
      },
    );

    gsap.fromTo(
      root.querySelectorAll('.ek-contact-info__item'),
      { autoAlpha: 0, y: 18, filter: 'blur(8px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.querySelector('.ek-contact-info'),
          start: 'top 82%',
          once: true,
        },
      },
    );
  }, root);

  return () => context.revert();
}
