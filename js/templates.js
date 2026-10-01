// Trusted local page templates; never insert user input as HTML.
window.HelpingHandsTemplates = {
  "home": {
    "title": "Helping Hands",
    "html": "\n \n        <section>\n            <h2>About Us</h2>\n\n            <picture>\n                <source srcset=\"../images/volunteers.webp\" type=\"image/webp\">\n\n                <img\n                    src=\"../images/volunteers.jpg\"\n                    alt=\"Volunteers distributing food packages to families\"\n                >\n            </picture>\n\n            <p>\n                Helping Hands is a nonprofit organization dedicated to supporting\n                vulnerable communities through social projects, donations and\n                volunteer work.\n            </p>\n        </section>\n\n        <section>\n            <h2>How You Can Help</h2>\n\n            <p>\n                You can support our work by becoming a volunteer or contributing\n                to one of our donation campaigns.\n            </p>\n\n            <a href=\"#/projects\">View our projects</a>\n        </section>\n\n        <section>\n            <h2>Contact Us</h2>\n\n            <p>Email: contact@helpinghands.org</p>\n            <p>Phone: (84) 99999-9999</p>\n        </section>\n\n    "
  },
  "projects": {
    "title": "Projects - Helping Hands",
    "html": "\n\n        <h2>Our Projects</h2>\n\n        <section>\n            <h2>Social Projects</h2>\n\n            <div class=\"grid\">\n                <article class=\"project-card\">\n                    <div class=\"badge-group\" aria-label=\"Project status\">\n                        <span class=\"badge badge-success\">Active</span>\n                        <span class=\"badge badge-error\">High Priority</span>\n                    </div>\n\n                    <h3>Food Donation</h3>\n                    <p>\n                        This project distributes food packages to families\n                        experiencing financial difficulties.\n                    </p>\n                </article>\n\n                <article class=\"project-card\">\n                    <div class=\"badge-group\" aria-label=\"Project status\">\n                        <span class=\"badge badge-success\">Active</span>\n                        <span class=\"badge badge-warning\">Accepting Volunteers</span>\n                    </div>\n\n                    <h3>Education Support</h3>\n                    <p>\n                        Volunteers provide educational activities and learning\n                        support to children in the community.\n                    </p>\n                </article>\n            </div>\n        </section>\n\n        <section>\n            <h2>Volunteer Opportunities</h2>\n\n            <p>\n                Volunteers can participate in food distribution, educational\n                activities and community events.\n            </p>\n\n            <a class=\"button\" href=\"#/registration/registration-info\">Become a volunteer</a>\n        </section>\n\n        <section>\n            <h2>Donation Campaigns</h2>\n\n            <p>\n                Donations help fund our social projects and provide essential\n                resources to families in need.\n            </p>\n\n            <p>\n                Contributions can include food, clothing and financial support.\n            </p>\n        </section>\n\n    "
  },
  "registration": {
    "title": "Helping Hands - Sign Up",
    "html": "\n        <h2>Sign Up</h2>\n\n        <div class=\"alert alert-info\" role=\"note\">\n            Please complete all required fields before submitting your registration.\n        </div>\n\n        <div id=\"registration-info\" class=\"toast toast-success\" role=\"status\" aria-live=\"polite\">\n            <span>You're almost there! Complete the form to become a volunteer.</span>\n            <a class=\"toast-close\" href=\"#/registration/registration-form\" aria-label=\"Dismiss notification\">×</a>\n        </div>\n\n        <form id=\"registration-form\" novalidate>\n            <fieldset>\n                <legend>Personal Information</legend>\n\n                <div class=\"grid\">\n                    <div class=\"form-group col-6\">\n                        <label for=\"fullname\">Full Name:</label>\n                        <input type=\"text\" id=\"fullname\" name=\"fullname\" required>\n                    </div>\n\n                    <div class=\"form-group col-6\">\n                        <label for=\"birthdate\">Birth Date:</label>\n                        <input type=\"date\" id=\"birthdate\" name=\"birthdate\" required>\n                    </div>\n\n                    <div class=\"form-group col-12\">\n                        <label for=\"CPF\">CPF:</label>\n                        <input type=\"text\" id=\"CPF\" name=\"CPF\" inputmode=\"numeric\" maxlength=\"11\" pattern=\"\\d{11}\" title=\"Please enter 11 digits for CPF\" required>\n                    </div>\n                </div>\n            </fieldset>\n\n            <fieldset>\n                <legend>Contact Information</legend>\n\n                <div class=\"grid\">\n                    <div class=\"form-group col-6\">\n                        <label for=\"email\">Email:</label>\n                        <input type=\"email\" id=\"email\" name=\"email\" required>\n                    </div>\n\n                    <div class=\"form-group col-6\">\n                        <label for=\"phonenumber\">Phone Number:</label>\n                        <input type=\"tel\" id=\"phonenumber\" name=\"phonenumber\" inputmode=\"numeric\" maxlength=\"11\" pattern=\"\\d{11}\" title=\"Please enter a valid phone number\" required>\n                    </div>\n                </div>\n            </fieldset>\n\n            <fieldset>\n                <legend>Address Information</legend>\n\n                <div class=\"grid\">\n                    <div class=\"form-group col-12\">\n                        <label for=\"address\">Address:</label>\n                        <input type=\"text\" id=\"address\" name=\"address\" required>\n                    </div>\n\n                    <div class=\"form-group col-4\">\n                        <label for=\"city\">City:</label>\n                        <input type=\"text\" id=\"city\" name=\"city\" required>\n                    </div>\n\n                    <div class=\"form-group col-4\">\n                        <label for=\"state\">State:</label>\n                        <input type=\"text\" id=\"state\" name=\"state\" required>\n                    </div>\n\n                    <div class=\"form-group col-4\">\n                        <label for=\"zipcode\">Zip Code:</label>\n                        <input type=\"text\" id=\"zipcode\" name=\"zipcode\" inputmode=\"numeric\" maxlength=\"8\" pattern=\"\\d{8}\" title=\"Please enter 8 digits for Zip Code\" required>\n                    </div>\n                </div>\n            </fieldset>\n\n            <input type=\"submit\" value=\"Register\">\n        </form>\n    "
  }
};

// Component data is independent of its presentation.
const socialProjects = [
    {
        title: 'Food Donation',
        description: 'This project distributes food packages to families experiencing financial difficulties.',
        badges: [{ label: 'Active', type: 'success' }, { label: 'High Priority', type: 'error' }]
    },
    {
        title: 'Education Support',
        description: 'Volunteers provide educational activities and learning support to children in the community.',
        badges: [{ label: 'Active', type: 'success' }, { label: 'Accepting Volunteers', type: 'warning' }]
    }
];

function escapeHTML(value) {
    const characters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, (character) => characters[character]);
}

function projectCard(project) {
    const badges = project.badges.map((badge) => {
        const type = ['success', 'error', 'warning'].includes(badge.type) ? badge.type : 'info';
        return `<span class="badge badge-${type}">${escapeHTML(badge.label)}</span>`;
    }).join('');

    return `<article class="project-card">
        <div class="badge-group" aria-label="Project status">${badges}</div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
    </article>`;
}

// Generate the repeated cards each time the router renders this page.
const projectsPageHTML = HelpingHandsTemplates.projects.html;
HelpingHandsTemplates.projects.render = () => projectsPageHTML.replace(
    /<div class="grid">[\s\S]*?<\/div>\s*<\/section>/,
    `<div class="grid">${socialProjects.map(projectCard).join('')}</div></section>`
);
