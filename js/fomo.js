/**
 * FOMO (Fear of Missing Out) Elements for Donation Page
 * Handles live notifications, counters, and social proof.
 */

const FOMO = {
    // Configuration
    config: {
        notificationIntervalMin: 8000,
        notificationIntervalMax: 15000,
        notificationDisplayTime: 6000,
        maxNotifications: 3,
        initialDonorCount: 12453, // Starting number for "people donated"
        initialViewers: 42,
    },

    // Data
    countries: [
        { code: 'US', flag: '🇺🇸', name: 'United States' },
        { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
        { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
        { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
        { code: 'CA', flag: '🇨🇦', name: 'Canada' },
        { code: 'AU', flag: '🇦🇺', name: 'Australia' },
        { code: 'DE', flag: '🇩🇪', name: 'Germany' },
        { code: 'FR', flag: '🇫🇷', name: 'France' },
        { code: 'KW', flag: '🇰🇼', name: 'Kuwait' },
        { code: 'QA', flag: '🇶🇦', name: 'Qatar' },
        { code: 'OM', flag: '🇴🇲', name: 'Oman' },
        { code: 'BH', flag: '🇧🇭', name: 'Bahrain' },
        { code: 'IN', flag: '🇮🇳', name: 'India' },
        { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
        { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
        { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
        { code: 'SG', flag: '🇸🇬', name: 'Singapore' },
    ],

    names: [
        'Sarah', 'Mohammed', 'Fatima', 'John', 'Ahmed', 'Emily', 'Abdullah', 'Michael',
        'Aisha', 'David', 'Omar', 'Jessica', 'Khalid', 'Jennifer', 'Yousef', 'Maria',
        'Ibrahim', 'Lisa', 'Ali', 'Robert', 'Maryam', 'William', 'Hassan', 'Elizabeth',
        'Zainab', 'James', 'Layla', 'Thomas', 'Noor', 'Daniel', 'Huda', 'Richard'
    ],

    amounts: [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000],

    // State
    state: {
        totalDonors: 0,
        currentViewers: 0,
        recentDonations: [],
    },

    // Initialization
    init: function () {
        this.state.totalDonors = this.config.initialDonorCount;
        this.state.currentViewers = this.config.initialViewers;

        this.injectStyles();
        this.createNotificationContainer();
        this.startNotificationLoop();
        this.startCounterUpdates();
        this.startUrgencyUpdates();
        this.initRecentDonorsList();

        // Initial render
        this.updateCounterDisplay();
        this.updateUrgencyDisplay();
    },

    // Generators
    generateDonation: function () {
        const country = this.countries[Math.floor(Math.random() * this.countries.length)];
        const isAnonymous = Math.random() > 0.7;
        const name = isAnonymous ? 'Anonymous' : this.names[Math.floor(Math.random() * this.names.length)];
        const amount = this.amounts[Math.floor(Math.random() * this.amounts.length)];

        return {
            country: country,
            name: name,
            amount: amount,
            timeAgo: 'Just now'
        };
    },

    // UI Injection
    injectStyles: function () {
        const style = document.createElement('style');
        style.textContent = `
            /* Notification Container */
            .fomo-toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column-reverse; /* Newest at bottom (visually top of stack) */
                gap: 10px;
                pointer-events: none; /* Allow clicking through container */
            }

            @media (max-width: 768px) {
                .fomo-toast-container {
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                    align-items: center;
                }
            }

            /* Toast Notification */
            .fomo-toast {
                background: rgba(255, 255, 255, 0.95);
                border-left: 4px solid #d32f2f;
                padding: 12px 16px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 280px;
                max-width: 350px;
                transform: translateX(100%); /* Start off-screen right */
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                pointer-events: auto;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.9rem;
                color: #333;
            }

            .fomo-toast.show {
                transform: translateX(0);
                opacity: 1;
            }

            .fomo-toast.hide {
                opacity: 0;
                transform: translateY(20px);
            }

            .fomo-toast-icon {
                font-size: 1.5rem;
            }

            .fomo-toast-content {
                display: flex;
                flex-direction: column;
            }

            .fomo-toast-title {
                font-weight: 600;
                color: #d32f2f;
            }

            .fomo-toast-meta {
                font-size: 0.75rem;
                color: #777;
            }

            /* Live Counter Pulse */
            @keyframes pulse-red {
                0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(211, 47, 47, 0); }
                100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
            }

            .fomo-counter-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #fff;
                color: #d32f2f;
                padding: 8px 16px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 0.9rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                margin-bottom: 15px;
            }
            
            .fomo-counter-badge.pulse {
                animation: pulse-red 2s infinite;
            }

            /* Urgency Indicator */
            .fomo-urgency-bar {
                background: #fff3cd;
                color: #856404;
                padding: 8px;
                text-align: center;
                font-size: 0.85rem;
                font-weight: 500;
                border-bottom: 1px solid #ffeeba;
            }

            .fomo-live-dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: #dc3545;
                border-radius: 50%;
                margin-right: 6px;
                animation: blink 1.5s infinite;
            }

            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.4; }
                100% { opacity: 1; }
            }

            /* Recent Donors List */
            .fomo-recent-list {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 15px;
                max-height: 300px;
                overflow-y: hidden;
                position: relative;
            }

            .fomo-recent-list h4 {
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 1.1rem;
                color: #333;
                border-bottom: 2px solid #d32f2f;
                padding-bottom: 8px;
                display: inline-block;
            }

            .fomo-list-container {
                height: 200px;
                overflow: hidden;
                position: relative;
            }

            .fomo-list-items {
                width: 100%;
            }

            .fomo-list-item {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
                font-size: 0.9rem;
                animation: fomoSlideDown 0.5s ease-out;
            }
            
            @keyframes fomoSlideDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .fomo-list-item:last-child {
                border-bottom: none;
            }

            .fomo-item-left {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .fomo-item-amount {
                font-weight: 600;
                color: #28a745;
            }
        `;
        document.head.appendChild(style);
    },

    createNotificationContainer: function () {
        const container = document.createElement('div');
        container.className = 'fomo-toast-container';
        document.body.appendChild(container);
        this.container = container;
    },

    // Logic
    startNotificationLoop: function () {
        const loop = () => {
            const delay = Math.floor(Math.random() * (this.config.notificationIntervalMax - this.config.notificationIntervalMin + 1)) + this.config.notificationIntervalMin;
            setTimeout(() => {
                this.showNotification();
                this.incrementCounter(); // New donation means counter goes up
                this.addRecentDonor(); // Add to the list
                loop();
            }, delay);
        };
        loop();
    },

    showNotification: function () {
        const donation = this.generateDonation();

        const toast = document.createElement('div');
        toast.className = 'fomo-toast';
        toast.innerHTML = `
            <div class="fomo-toast-icon">${donation.country.flag}</div>
            <div class="fomo-toast-content">
                <div class="fomo-toast-title">${donation.name} from ${donation.country.name}</div>
                <div class="fomo-toast-meta">Just donated $${donation.amount}</div>
            </div>
        `;

        // Manage queue
        if (this.container.children.length >= this.config.maxNotifications) {
            const oldest = this.container.firstElementChild;
            oldest.classList.add('hide');
            setTimeout(() => oldest.remove(), 500);
        }

        this.container.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;

        toast.classList.add('show');

        // Auto dismiss
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('hide');
                setTimeout(() => {
                    if (toast.parentNode) toast.remove();
                }, 500);
            }
        }, this.config.notificationDisplayTime);
    },

    startCounterUpdates: function () {
        // Also update counter randomly without notification sometimes?
        // For now, linked to notifications is fine, plus maybe some background increments
    },

    incrementCounter: function () {
        this.state.totalDonors++;
        this.updateCounterDisplay();
    },

    updateCounterDisplay: function () {
        const els = document.querySelectorAll('.fomo-counter-value');
        els.forEach(el => {
            el.textContent = this.state.totalDonors.toLocaleString();
            // Trigger pulse on parent
            const badge = el.closest('.fomo-counter-badge');
            if (badge) {
                badge.classList.remove('pulse');
                void badge.offsetWidth; // reflow
                badge.classList.add('pulse');
            }
        });
    },

    startUrgencyUpdates: function () {
        setInterval(() => {
            // Random walk
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            this.state.currentViewers += change;
            if (this.state.currentViewers < 10) this.state.currentViewers = 10;
            this.updateUrgencyDisplay();
        }, 3000);
    },

    updateUrgencyDisplay: function () {
        const els = document.querySelectorAll('.fomo-viewers-value');
        els.forEach(el => {
            el.textContent = this.state.currentViewers;
        });
    },

    initRecentDonorsList: function () {
        // Populate initial list
        for (let i = 0; i < 5; i++) {
            this.addRecentDonor(true); // true = silent (no animation/scroll yet)
        }
    },

    addRecentDonor: function (silent = false) {
        const donation = this.generateDonation();
        const listContainers = document.querySelectorAll('.fomo-list-items');

        listContainers.forEach(container => {
            const item = document.createElement('div');
            item.className = 'fomo-list-item';
            if (silent) {
                item.style.animation = 'none';
            }
            item.innerHTML = `
                <div class="fomo-item-left">
                    <span>${donation.country.flag}</span>
                    <strong>${donation.name}</strong>
                </div>
                <div class="fomo-item-amount">$${donation.amount}</div>
            `;

            // Prepend
            container.insertBefore(item, container.firstElementChild);

            // Limit list size
            if (container.children.length > 20) {
                container.lastElementChild.remove();
            }
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    FOMO.init();
});
