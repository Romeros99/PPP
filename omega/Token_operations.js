const {sign, verify}=require("jsonwebtoken");

const createTokens = (username,run,nombre, role) => {
    const accessToken = sign(
        {mail: username,run: run,nombre:nombre, role: role}, "jwtsecret");
return accessToken;
}

//middleware para comprobar sesion 
const validateToken = (req, res, next) => {
    const token = req.cookies['access-Token'];
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó un token.' });
    }
  
    try {
      const decoded = verify(token, 'jwtsecret'); // Reemplaza 'secreto' con tu clave secreta real
  
      // Agrega los datos decodificados del token al objeto 'req' para usarlos en los controladores o middleware posteriores
      req.userData = decoded;
      
      next(); //pasa al siguiente middleware
    } catch (error) {
      return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
  };

  //middleware para obtener datos de usuario
  const Decode_user_data = (req, res) => {
    // Acceder a los datos decodificados del token en req.userData
    const {mail,run,nombre, role}= req.userData;
    // Enviar una respuesta al cliente
    res.json({ mail: mail,run: run,nombre:nombre, role: role});
  };

module.exports = {createTokens, validateToken,Decode_user_data}