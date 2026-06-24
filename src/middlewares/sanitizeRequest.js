function sanitizeValue(value) { if (typeof value === 'string') return value.replace(/[<>]/g, '').trim(); if (Array.isArray(value)) return value.map(sanitizeValue); if (value && typeof value === 'object') { const sanitized = {}; for (const key of Object.keys(value)) sanitized[key] = sanitizeValue(value[key]); return sanitized; } return value; }
function sanitizeRequest(req, res, next) { req.body = sanitizeValue(req.body || {}); req.query = sanitizeValue(req.query || {}); req.params = sanitizeValue(req.params || {}); next(); }
module.exports = sanitizeRequest;
