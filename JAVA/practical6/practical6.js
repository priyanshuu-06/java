// Name: Priyanshu
// PRN: 
let text = "Contact us at admin@example.com or support@gmail.com. Welcome to our website!";

// 1. Email validation
let email = "student@example.com";
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log("Valid Email:", emailRegex.test(email));

// 2. Data extraction - extract all emails
let emails = text.match(/\b[^\s@]+@[^\s@]+\.[^\s@]+\b/g);
console.log("Extracted Emails:", emails);

// 3. String functions
console.log("Uppercase:", text.toUpperCase());
console.log("Lowercase:", text.toLowerCase());
console.log("Contains 'Welcome':", text.includes("Welcome"));
console.log("Text Length:", text.length);


let words = text.split(/\s+/);
console.log("Number of Words:", words.length);


let count = (text.match(/email/gi) || []).length;
console.log("Occurrences of 'email':", count);


let replaced = text.replace('support@gmail.com', 'help@company.org');
console.log("Replaced Text:", replaced);


let masked = text.replace(/\b([^\s@]+)@([^\s@]+\.[^\s@]+)\b/g, (m, local, domain) => {
	return local[0] + '***@' + domain;
});
console.log("Masked Emails:", masked);


let domains = (emails || []).map(e => e.split('@')[1]);
let domainCounts = domains.reduce((acc, d) => {
	acc[d] = (acc[d] || 0) + 1;
	return acc;
}, {});
console.log("Domain Counts:", domainCounts);


let longest = words.reduce((a, w) => (w.length > a.length ? w : a), "");
let avgLen = Math.round((words.reduce((s, w) => s + w.length, 0) / words.length) * 100) / 100;
console.log("Longest Word:", longest);
console.log("Average Word Length:", avgLen);


let sample = "Call us: +1-800-555-1234 or (555) 123-4567.";
let phones = sample.match(/(\+?\d{1,2}[-.\s])?(\(?\d{3}\)?[-.\s])?\d{3}[-.\s]\d{4}/g) || [];
console.log("Sample Phones:", phones);