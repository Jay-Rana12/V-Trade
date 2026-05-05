/* assets/js/profile-loader.js */
$(function () {
    function getInitials(name) {
        if (!name) return "VIT";
        const words = name.trim().split(/\s+/);
        if (words.length === 1) return words[0].substring(0, 3).toUpperCase();
        return (words[0][0] + words[1][0] + (words[2] ? words[2][0] : '')).toUpperCase();
    }

    function renderProfileCard(p) {
        const initials = getInitials(p.company_name);
        const tags = p.manufactured_products ? p.manufactured_products.split(',').map(t => `<span>${t.trim()}</span>`).join('') : '';
        const verifiedBadge = p.is_verified == 1 ? '<span class="biz-verified"><i class="bi bi-patch-check-fill"></i> Verified</span>' : '';

        return `
            <div class="biz-card mx-auto animate-fade-in" style="margin-bottom: 40px;">
                <div class="biz-card-header">
                    <div class="biz-logo-wrap">
                        <svg viewBox="0 0 80 80" width="80" height="80">
                            <circle cx="40" cy="40" r="40" fill="url(#grad_${p.id})" />
                            <defs>
                                <linearGradient id="grad_${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#1a3a5f" />
                                    <stop offset="100%" style="stop-color:#2563a8" />
                                </linearGradient>
                            </defs>
                            <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="24" font-weight="800">${initials}</text>
                        </svg>
                    </div>
                    <div class="biz-header-info">
                        <div class="d-flex align-items-center flex-wrap gap-2 mb-1">
                            <h3 class="biz-company-name">${p.company_name}</h3>
                            ${verifiedBadge}
                        </div>
                        <div class="d-flex align-items-center flex-wrap gap-2">
                            <span class="biz-tag" style="background:linear-gradient(135deg,#1a3a5f,#2563a8)"><i class="bi bi-building-gear me-1"></i>${p.profile_type}</span>
                            ${p.certifications ? `<span class="biz-tag" style="background:#16a34a"><i class="bi bi-award-fill me-1"></i>${p.certifications}</span>` : ''}
                            ${p.member_type ? `<span class="biz-tag" style="background:#d97706"><i class="bi bi-star-fill me-1"></i>${p.member_type}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="biz-card-body">
                    <div class="biz-left">
                        <div class="biz-info-block">
                            <div class="biz-info-row"><i class="bi bi-person-fill"></i>
                                <div><span class="biz-info-label">Owner / Director</span><span class="biz-info-val">${p.owner_name || 'N/A'}</span></div>
                            </div>
                            <div class="biz-info-row"><i class="bi bi-telephone-fill"></i>
                                <div><span class="biz-info-label">Contact Number</span><span class="biz-info-val">${p.contact_number || 'N/A'}</span></div>
                            </div>
                            <div class="biz-info-row"><i class="bi bi-envelope-fill"></i>
                                <div><span class="biz-info-label">Email Address</span><span class="biz-info-val">${p.email_address || 'N/A'}</span></div>
                            </div>
                            <div class="biz-info-row"><i class="bi bi-geo-alt-fill"></i>
                                <div><span class="biz-info-label">Company Address</span><span class="biz-info-val">${p.company_address || 'N/A'}</span></div>
                            </div>
                            ${p.established_year ? `
                            <div class="biz-info-row"><i class="bi bi-calendar3"></i>
                                <div><span class="biz-info-label">Established</span><span class="biz-info-val">${p.established_year}</span></div>
                            </div>` : ''}
                            ${p.company_size ? `
                            <div class="biz-info-row"><i class="bi bi-people-fill"></i>
                                <div><span class="biz-info-label">Company Size</span><span class="biz-info-val">${p.company_size}</span></div>
                            </div>` : ''}
                        </div>
                    </div>
                    <div class="biz-right">
                        <div class="biz-about">
                            <h6><i class="bi bi-info-circle-fill me-2" style="color:#2563a8"></i>About the Company</h6>
                            <p>${p.about_company || 'Information not provided.'}</p>
                        </div>
                        ${tags ? `
                        <div class="biz-products">
                            <h6><i class="bi bi-box-seam-fill me-2" style="color:#2563a8"></i>Products & Services</h6>
                            <div class="biz-product-tags">${tags}</div>
                        </div>` : ''}
                        <div class="biz-card-footer-row">
                            <div class="biz-stats-mini">
                                ${p.annual_turnover ? `<span><strong>${p.annual_turnover}</strong> Annual Turnover</span>` : ''}
                                ${p.export_countries ? `<span><strong>${p.export_countries}</strong> Export Countries</span>` : ''}
                                ${p.b2b_clients ? `<span><strong>${p.b2b_clients}</strong> B2B Clients</span>` : ''}
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <a href="contact.html" class="biz-btn-primary"><i class="bi bi-telephone-fill me-1"></i>Contact Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.initProfileLoader = async function (type) {
        const container = $('#profileContainer');
        if (!container.length) return;

        container.html('<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Fetching profiles...</p></div>');

        try {
            const res = await fetch(`api/profiles.php?type=${encodeURIComponent(type)}`);
            const data = await res.json();

            if (!Array.isArray(data) || data.length === 0) {
                container.html('<div class="text-center py-5 text-muted"><p>No certified ' + type + 's found at the moment.</p></div>');
                return;
            }

            let html = '';
            data.forEach(p => {
                html += renderProfileCard(p);
            });
            container.html(html);
        } catch (err) {
            console.error('Failed to load profiles:', err);
            container.html('<div class="alert alert-danger">Error loading profiles. Please try again later.</div>');
        }
    };
});
