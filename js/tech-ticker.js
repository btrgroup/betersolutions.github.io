(function () {
    const wrap = document.querySelector('.tech-ticker');
    const track = document.querySelector('.tech-ticker-track');
    if (!wrap || !track) return;

    const DURATION_MS = 55000;
    const DRAG_CLICK_THRESHOLD = 6;

    let halfWidth = track.scrollWidth / 2;
    let baseSpeed = halfWidth ? -halfWidth / DURATION_MS : 0;
    let position = 0;
    let velocity = baseSpeed;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPosition = 0;
    let dragDistance = 0;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let lastFrameTime = null;

    function wrapPosition(pos) {
        if (halfWidth <= 0) return 0;
        pos %= halfWidth;
        if (pos > 0) pos -= halfWidth;
        return pos;
    }

    function recalc() {
        halfWidth = track.scrollWidth / 2;
        baseSpeed = halfWidth ? -halfWidth / DURATION_MS : 0;
        position = wrapPosition(position);
    }

    window.addEventListener('resize', recalc);
    window.addEventListener('load', recalc);

    function frame(t) {
        if (lastFrameTime === null) lastFrameTime = t;
        const dt = Math.min(t - lastFrameTime, 50);
        lastFrameTime = t;

        if (!isDragging) {
            const friction = Math.pow(0.94, dt / 16.6667);
            velocity = baseSpeed + (velocity - baseSpeed) * friction;
            position = wrapPosition(position + velocity * dt);
            track.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        isDragging = true;
        dragDistance = 0;
        track.setPointerCapture(e.pointerId);
        dragStartX = e.clientX;
        dragStartPosition = position;
        lastMoveX = e.clientX;
        lastMoveTime = performance.now();
        velocity = 0;
        track.classList.add('is-dragging');
    });

    track.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const now = performance.now();
        const dx = e.clientX - dragStartX;
        dragDistance = Math.max(dragDistance, Math.abs(dx));
        position = wrapPosition(dragStartPosition + dx);
        track.style.transform = `translateX(${position}px)`;

        const dt = now - lastMoveTime;
        if (dt > 0) {
            velocity = (e.clientX - lastMoveX) / dt;
        }
        lastMoveX = e.clientX;
        lastMoveTime = now;
    });

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('is-dragging');
        if (Math.abs(velocity) < Math.abs(baseSpeed)) {
            velocity = baseSpeed;
        }
    }

    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // Suppress the CNCF link's click when it was actually a drag/swipe.
    track.addEventListener(
        'click',
        (e) => {
            if (dragDistance > DRAG_CLICK_THRESHOLD) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        true
    );
})();
