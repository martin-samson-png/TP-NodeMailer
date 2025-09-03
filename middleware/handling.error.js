const errorHandler = (err, req, res, next) => {
  console.log("Error occurred:", err.message);
  switch (err.message) {
    case "ArgumentRequired":
      return res.status(400).json({ message: "Donnée manquante" });
    case "IncorrectData":
      return res.status(401).json({ message: "Incorrect Data" });
    case "Unauthorized":
      return res.status(403).json({ message: "Accès interdit " });
    case "DataAlreadyExist":
      return res.status(409).json({ message: "Donnée déjà existante" });
    case "DataNotFound":
      return res.status(404).json({ message: "Donnée non trouvé" });
    case "DatabaseException":
      return res
        .status(500)
        .json({ message: "Une erreur de base de données s'est produite" });
    default:
      return res
        .status(500)
        .json({ message: "Une erreur inattendue s'est produite" });
  }
};
export default errorHandler;
