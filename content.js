function injectCollapseButtons() {
    const allElements = document.querySelectorAll('[data-message-author-role]');
    const messages = Array.from(allElements);

    messages.forEach((msg, index) => {
        if (msg.getAttribute('data-message-author-role') === 'user') {
            const nextMsg = messages[index + 1];
            
            if (nextMsg && nextMsg.getAttribute('data-message-author-role') === 'assistant') {
                const allAssistants = document.querySelectorAll('[data-message-author-role="assistant"]');
                const isLast = (nextMsg === allAssistants[allAssistants.length - 1]);

                // Find the outermost wrappers (often <section> or <article>)
                const userContainer = msg.closest('section, article, [data-testid^="conversation-turn"]') || msg.parentElement.parentElement;
                const assistantContainer = nextMsg.closest('section, article, [data-testid^="conversation-turn"]') || nextMsg.parentElement.parentElement;

                // Compress vertical spacing on the user container
                userContainer.classList.add('prettygpt-compress-vertical');
                // Ensure immediate children also get compressed (fixes the padding 48px issue)
                Array.from(userContainer.children).forEach(child => child.classList.add('prettygpt-compress-vertical-inner'));
                
                // Do the same for assistant container so the gap is fully eliminated
                assistantContainer.classList.add('prettygpt-compress-vertical');

                // Find user action bar <div aria-label="你的訊息操作"...>
                let userActionBar = userContainer.querySelector('[aria-label*="訊息操作"], [aria-label*="message actions" i]');
                if (!userActionBar) {
                    const userBtns = Array.from(userContainer.querySelectorAll('button'));
                    if (userBtns.length > 0) userActionBar = userBtns[0].parentElement;
                }

                // --- TOP BUTTON (User Action Bar) ---
                let btn = userContainer.querySelector('.prettygpt-toggle-btn-top');
                if (!btn) {
                    btn = document.createElement('button');
                    btn.className = 'prettygpt-toggle-btn prettygpt-toggle-btn-top text-token-text-secondary';
                    
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (assistantContainer.classList.contains('prettygpt-collapsed')) {
                            assistantContainer.classList.remove('prettygpt-collapsed');
                            assistantContainer.setAttribute('data-prettygpt-expanded', 'true');
                            btn.innerHTML = '🤖 收合';
                            if (btnBottom) btnBottom.innerHTML = '🤖 收合';
                        } else {
                            assistantContainer.classList.add('prettygpt-collapsed');
                            assistantContainer.removeAttribute('data-prettygpt-expanded');
                            btn.innerHTML = '🤖 展開';
                        }
                        btn.blur(); // Fix: remove focus so it can hide on mouseout
                    });

                    if (userActionBar) {
                        userActionBar.insertBefore(btn, userActionBar.firstChild);
                    } else {
                        let fallbackWrapper = document.createElement('div');
                        fallbackWrapper.className = 'flex justify-end gap-1 mt-2';
                        fallbackWrapper.appendChild(btn);
                        msg.appendChild(fallbackWrapper);
                    }
                }

                // --- BOTTOM BUTTON (Assistant Action Bar) ---
                let aiActionBar = assistantContainer.querySelector('[aria-label*="回覆操作"], [aria-label*="Reply actions" i]');
                if (!aiActionBar) {
                    const aiBtns = Array.from(assistantContainer.querySelectorAll('button'));
                    if (aiBtns.length > 0) aiActionBar = aiBtns[aiBtns.length - 1].closest('.flex') || aiBtns[aiBtns.length - 1].parentElement;
                }

                let btnBottom = assistantContainer.querySelector('.prettygpt-toggle-btn-bottom');
                if (!btnBottom) {
                    btnBottom = document.createElement('button');
                    btnBottom.className = 'prettygpt-toggle-btn prettygpt-toggle-btn-bottom text-token-text-secondary';
                    
                    btnBottom.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // The bottom button is only visible when expanded, so clicking it will ALWAYS collapse
                        assistantContainer.classList.add('prettygpt-collapsed');
                        assistantContainer.removeAttribute('data-prettygpt-expanded');
                        btn.innerHTML = '🤖 展開'; // Sync top button
                        btnBottom.innerHTML = '🤖 展開';
                        btnBottom.blur();
                    });

                    if (aiActionBar) {
                        aiActionBar.insertBefore(btnBottom, aiActionBar.firstChild);
                    }
                }

                const userExpanded = assistantContainer.hasAttribute('data-prettygpt-expanded');

                if (isLast) {
                    if (!assistantContainer.classList.contains('prettygpt-collapsed')) {
                         btn.innerHTML = '🤖 收合';
                         if (btnBottom) btnBottom.innerHTML = '🤖 收合';
                         assistantContainer.classList.remove('prettygpt-collapsed');
                    }
                } else {
                    if (!userExpanded) {
                        assistantContainer.classList.add('prettygpt-collapsed');
                        btn.innerHTML = '🤖 展開';
                        if (btnBottom) btnBottom.innerHTML = '🤖 展開';
                    } else {
                        btn.innerHTML = '🤖 收合';
                        if (btnBottom) btnBottom.innerHTML = '🤖 收合';
                    }
                }
            }
        }
    });
}

const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldUpdate = true;
            break;
        }
    }
    if (shouldUpdate) {
        clearTimeout(window.prettyGptTimeout);
        window.prettyGptTimeout = setTimeout(injectCollapseButtons, 200);
    }
});

observer.observe(document.body, { childList: true, subtree: true });
injectCollapseButtons();
