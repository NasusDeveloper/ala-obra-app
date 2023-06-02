export const verifyRoles = (roles) => (req, res, next) => {
  // Verificar si el usuario tiene los roles requeridos
  const userRoles = req.user.roles;
  const hasRequiredRoles = roles.some((role) => userRoles.includes(role));

  if (!hasRequiredRoles) {
    return res.status(403).json({ msg: 'No tienes los permisos requeridos' });
  }

  next();
};
