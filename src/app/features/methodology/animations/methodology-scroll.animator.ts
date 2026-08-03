export type MethodologyCleanup = () => void;

export async function setupMethodologyScroll(
  root: HTMLElement,
  onActiveStage: (index: number) => void,
): Promise<MethodologyCleanup> {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersStaticFlow = window.matchMedia('(max-width: 980px)').matches;
  const viewport = root.querySelector<HTMLElement>('[data-methodology-viewport]');
  const track = root.querySelector<HTMLElement>('[data-methodology-track]');
  const stages = Array.from(root.querySelectorAll<HTMLElement>('.ek-methodology-stage'));
  const stageCount = Math.max(stages.length, 1);

  onActiveStage(0);

  if (!viewport || prefersReducedMotion || prefersStaticFlow) {
    onActiveStage(-1);
    root.classList.add('ek-methodology-experience--static');
    return () => undefined;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: `+=${stageCount * 120}%`,
        scrub: 0.7,
        pin: viewport,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            stageCount - 1,
            Math.max(0, Math.round(self.progress * (stageCount - 1))),
          );

          root.style.setProperty('--ek-methodology-progress', self.progress.toFixed(3));
          onActiveStage(activeIndex);
        },
      },
    });

    timeline.fromTo(
      root,
      {
        '--ek-camera-x': '0%',
        '--ek-camera-y': '0%',
        '--ek-camera-scale': 0.96,
        '--ek-line-chaos': 1,
        '--ek-stage-focus': 0,
      },
      {
        '--ek-camera-x': '-7%',
        '--ek-camera-y': '-2%',
        '--ek-camera-scale': 1.06,
        '--ek-line-chaos': 0,
        '--ek-stage-focus': 1,
        ease: 'none',
        duration: 1,
      },
      0,
    );

    if (track && stageCount > 1) {
      const totalTrackShift = -((stageCount - 1) / stageCount) * 100;

      timeline.to(
        track,
        {
          xPercent: totalTrackShift,
          ease: 'none',
          duration: 1,
        },
        0,
      );
    }
  }, root);

  return () => context.revert();
}
