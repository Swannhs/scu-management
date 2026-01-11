const isAccessAllowed = ({ file, userId, hasGrant }) => {
  if (!file) return false;

  if (file.access_policy === 'TENANT_PUBLIC' || file.access_policy === 'PUBLIC') {
    return true;
  }

  if (file.access_policy === 'SHARED') {
    return hasGrant;
  }

  if (file.access_policy === 'PRIVATE') {
    return file.uploaded_by === userId || hasGrant;
  }

  return false;
};

module.exports = { isAccessAllowed };
