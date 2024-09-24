const bcrypt = require("bcrypt");

const hashedPassword =
  "$2b$10$YhCj5Hq4PSvwuRhNsLdATeYn19WoPXMrdvaVAeZhqUBiWd.vF9/we";
const plainPassword = "Lp5L7<3T05i.";

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error("Erreur de comparaison :", err);
  } else if (isMatch) {
    console.log("Le mot de passe correspond !");
  } else {
    console.log("Le mot de passe ne correspond pas.");
  }
});
