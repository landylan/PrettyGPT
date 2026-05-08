function injectCollapseButtons() {
    // Find all AI response containers
    const assistantMessages = document.querySelectorAll('[data-message-author-role="assistant"]');
    
    if (assistantMessages.length === 0) return;

    assistantMessages.forEach((msg, index) => {
        const isLast = (index === assistantMessages.length - 1);
        
        // Check if button already exists in this message
        let btnWrapper = msg.querySelector('.prettygpt-toggle-wrapper');
        let btn = msg.querySelector('.prettygpt-toggle-btn');

        if (!btnWrapper) {
            // Create wrapper and button
            btnWrapper = document.createElement('div');
            btnWrapper.className = 'prettygpt-toggle-wrapper';
            
            btn = document.createElement('button');
            btn.className = 'prettygpt-toggle-btn';
            
            // Add click listener
            btn.addEventListener('click', () => {
                if (msg.classList.contains('prettygpt-collapsed')) {
                    // Expand
                    msg.classList.remove('prettygpt-collapsed');
                    msg.setAttribute('data-prettygpt-expanded', 'true'); // User manually expanded
                    btn.innerHTML = '🤖 收合';
                } else {
                    // Collapse
                    msg.classList.add('prettygpt-collapsed');
                    msg.removeAttribute('data-prettygpt-expanded'); // User manually collapsed
                    btn.innerHTML = '🤖 展開';
                }
            });

            btnWrapper.appendChild(btn);

            // Find the markdown container to insert the button right before it
            const markdownDiv = msg.querySelector('.markdown');
            if (markdownDiv && markdownDiv.parentElement) {
                markdownDiv.parentElement.insertBefore(btnWrapper, markdownDiv);
            } else {
                // Fallback: append to the message root
                msg.appendChild(btnWrapper);
            }
        }

        // Logic for auto-collapse
        // We only auto-collapse if the user hasn't manually expanded it.
        const userExpanded = msg.hasAttribute('data-prettygpt-expanded');

        if (isLast) {
            // The last message should ALWAYS be expanded by default (for streaming generation)
            if (!msg.classList.contains('prettygpt-collapsed')) {
                 btn.innerHTML = '🤖 收合';
                 msg.classList.remove('prettygpt-collapsed');
            }
        } else {
            // For historical messages, collapse them if the user hasn't explicitly expanded them
            if (!userExpanded) {
                msg.classList.add('prettygpt-collapsed');
                btn.innerHTML = '🤖 展開';
            } else {
                btn.innerHTML = '🤖 收合';
            }
        }
    });
}

// Observe DOM changes to handle dynamically loaded messages (e.g. streaming responses or scrolling up)
const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldUpdate = true;
            break;
        }
    }
    if (shouldUpdate) {
        // Debounce slightly to avoid too many calls during fast DOM changes
        clearTimeout(window.prettyGptTimeout);
        window.prettyGptTimeout = setTimeout(injectCollapseButtons, 100);
    }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
injectCollapseButtons();
