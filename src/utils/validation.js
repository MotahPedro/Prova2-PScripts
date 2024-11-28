export function validateUser(user) {
  if (!user.name || typeof user.name !== 'string') {
    return 'Invalid name';
  }
  // Adicione outras validações conforme necessário
  return null;
}

export function validateLogin(user) {
  if (!user.username || typeof user.username !== 'string') {
    return 'Invalid username';
  }
  if (!user.password || typeof user.password !== 'string') {
    return 'Invalid password';
  }
  return null;
}
