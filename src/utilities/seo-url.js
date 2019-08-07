module.exports = function seoUrl(string) {
  string = string.toLowerCase();
  string = string.replace(/\s+/g, '-')
  string = string.replace(/[^a-z0-9_-]/, "");
  string = string.replace(/\?/g, '')
  string = string.replace(/\(/g, '')
  string = string.replace(/\)/g, '')
  string = string.replace(/'/g, '')
  string = string.replace(/&#39;/g, '')
  return "heading-" + string;
}