// Uso: npm run hash -- "minhaNovaSenha"
// Gera um hash bcrypt para usar em UPDATE usuarios SET senha = '<hash>' WHERE email = '...';
import bcrypt from "bcryptjs";

const senha = process.argv[2];
if (!senha) {
    console.error('Uso: npm run hash -- "sua-senha"');
    process.exit(1);
}
const rounds = Math.max(10, Number(process.env.BCRYPT_ROUNDS) || 10);
console.log(bcrypt.hashSync(senha, rounds));
