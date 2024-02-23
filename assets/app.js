/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import Swal from 'sweetalert2';
document.addEventListener('turbo:before-cache', () => {
    if (Swal.isVisible()) {
        Swal.getPopup().style.animationDuration = '0ms';
        Swal.close();
    }
});

const findCacheControlMeta = () => {
    return document.querySelector('meta[name="turbo-cache-control"]');
};

document.addEventListener('show.bs.modal', function () {
    if (findCacheControlMeta()) {
        return;
    }

    const meta = document.createElement('meta');
    meta.name = 'turbo-cache-control';
    meta.content = 'no-cache';
    meta.dataset.removable = true;
    document.head.appendChild(meta);
});

document.addEventListener('hidden.bs.modal', function () {
    const meta = findCacheControlMeta();
    if (!meta || !meta.dataset.removable) {
        return;
    }

    meta.remove();
});
