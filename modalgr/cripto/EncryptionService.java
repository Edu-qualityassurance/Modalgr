import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import java.util.Base64;

public class EncryptionService {

    private static final String CHAVE_SECRETA = "#modalGR#GPTW#top#maiorEmpresaTecnologia#baixadaSantista";
    private static final String ALGORITMO_AES = "AES";
    private static final String ALGORITMO_DES = "DES";
    private static final String ALGORITMO_3DES = "DESede"; // Triple DES
    private static final String FORMATO_DE_CODIFICACAO = "UTF-8";

    public static void main(String[] args) throws Exception {
        
        String senhaA = "SenhaAES123";
        String senhaB = "SenhaDES123";
        String senhaC = "Senha3DES123";

        
        SecretKeySpec chaveEspecificaAES = new SecretKeySpec(CHAVE_SECRETA.getBytes(FORMATO_DE_CODIFICACAO), 0, 16, ALGORITMO_AES);
        String senhaCriptografadaA = criptografar(senhaA, chaveEspecificaAES, ALGORITMO_AES);

        
        SecretKeySpec chaveEspecificaDES = new SecretKeySpec(CHAVE_SECRETA.getBytes(FORMATO_DE_CODIFICACAO), 0, 8, ALGORITMO_DES);
        String senhaCriptografadaB = criptografar(senhaB, chaveEspecificaDES, ALGORITMO_DES);

        
        DESedeKeySpec especificacaoChave3DES = new DESedeKeySpec(CHAVE_SECRETA.getBytes(FORMATO_DE_CODIFICACAO));
        SecretKeySpec chaveEspecifica3DES = new SecretKeySpec(SecretKeyFactory.getInstance("DESede").generateSecret(especificacaoChave3DES).getEncoded(), ALGORITMO_3DES);
        String senhaCriptografadaC = criptografar(senhaC, chaveEspecifica3DES, ALGORITMO_3DES);

       
        System.out.println("Senha A criptografada com AES: " + senhaCriptografadaA);
        System.out.println("Senha B criptografada com DES: " + senhaCriptografadaB);
        System.out.println("Senha C criptografada com Triple DES: " + senhaCriptografadaC);
    }

    private static String criptografar(String senhaPlana, SecretKeySpec chaveEspecifica, String algoritmoDeCriptografia) throws Exception {
        Cipher cifra = Cipher.getInstance(algoritmoDeCriptografia);
        cifra.init(Cipher.ENCRYPT_MODE, chaveEspecifica);
        byte[] bytesCriptografados = cifra.doFinal(senhaPlana.getBytes(FORMATO_DE_CODIFICACAO));
        return Base64.getEncoder().encodeToString(bytesCriptografados);
    }
}
