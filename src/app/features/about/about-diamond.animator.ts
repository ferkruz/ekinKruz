export type AboutDiamondMotionCleanup = () => void;

export async function setupAboutDiamondMotion(
  root: HTMLElement,
  reducedMotion: boolean,
): Promise<AboutDiamondMotionCleanup> {
  if (typeof window === 'undefined' || reducedMotion) {
    root.style.setProperty('--ek-diamond-reveal', '1');
    root.style.setProperty('--ek-diamond-opacity', '1');
    root.style.setProperty('--ek-diamond-glow', '0.72');
    root.style.setProperty('--ek-diamond-blur', '0px');
    root.style.setProperty('--ek-diamond-lift', '0rem');
    root.style.setProperty('--ek-diamond-scale', '1');
    root.style.setProperty('--ek-diamond-brightness', '1.08');
    return () => undefined;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    gsap.set(root, {
      '--ek-diamond-reveal': 0,
      '--ek-diamond-opacity': 0.26,
      '--ek-diamond-glow': 0.22,
      '--ek-diamond-blur': '8px',
      '--ek-diamond-lift': '0.7rem',
      '--ek-diamond-scale': 0.95,
      '--ek-diamond-brightness': 0.46,
    });
    gsap.set(root.querySelectorAll('.ek-about-diamond__value'), {
      autoAlpha: 0,
      y: 12,
    });
    gsap.set(root.querySelector('.ek-about-diamond__current'), {
      autoAlpha: 0,
      y: 10,
    });

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: root,
        start: 'top 72%',
        once: true,
      },
    });

    timeline
      .to(root, {
        '--ek-diamond-glow': 0.84,
        duration: 0.72,
      })
      .to(
        root,
        {
          '--ek-diamond-reveal': 1,
          '--ek-diamond-opacity': 1,
          '--ek-diamond-blur': '0px',
          '--ek-diamond-lift': '0rem',
          '--ek-diamond-scale': 1,
          '--ek-diamond-brightness': 1.08,
          duration: 1.35,
        },
        '-=0.42',
      )
      .to(
        root.querySelectorAll('.ek-about-diamond__value'),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        '-=0.46',
      )
      .to(
        root.querySelector('.ek-about-diamond__current'),
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.64,
        },
        '-=0.34',
      );
  }, root);

  return () => context.revert();
}
