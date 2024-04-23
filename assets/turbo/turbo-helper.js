import Swal from "sweetalert2";

const TurboHelper = class {
    constructor() {
        document.addEventListener('turbo:before-cache', () => {
            this.hideSweetAlert();
        });

        document.addEventListener('show.bs.modal', () => {
            this.addCacheControlMeta();
        });

        document.addEventListener('hidden.bs.modal', () => {
            this.removeCacheControlMeta();
        });

        document.addEventListener('turbo:render', () => {
            this.initializeWeatherWidget();
        });

        document.addEventListener('turbo:visit', () => {
            document.body.classList.add('turbo-loading');
        });

        document.addEventListener('turbo:before-render', (event) => {
            event.detail.newBody.classList.add('turbo-loading');
        });

        document.addEventListener('turbo:render', () => {
            requestAnimationFrame(() => {
                document.body.classList.remove('turbo-loading');
            });
        });
    }

    hideSweetAlert() {
        if (Swal.isVisible()) {
            Swal.getPopup().style.animationDuration = '0ms';
            Swal.close();
        }
    }

    addCacheControlMeta() {
        if (this.findCacheControlMeta()) {
            return;
        }

        const meta = document.createElement('meta');
        meta.name = 'turbo-cache-control';
        meta.content = 'no-cache';
        meta.dataset.removable = true;
        document.head.appendChild(meta);
    }

    removeCacheControlMeta() {
        const meta = this.findCacheControlMeta();
        if (!meta || !meta.dataset.removable) {
            return;
        }

        meta.remove();
    }

    findCacheControlMeta() {
        return document.querySelector('meta[name="turbo-cache-control"]');
    };

    initializeWeatherWidget() {
        __weatherwidget_init();
    }
}

export default new TurboHelper();
