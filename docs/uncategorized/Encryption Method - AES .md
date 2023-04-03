---
title: "Encryption Method - AES "
description: "AES, or Advanced Encryption Standard, is a widely-used encryption method that helps protect digital information by scrambling it into unreadable form."
date: 2023-03-23T00:04:26.013Z
tags: []
---
## AES, or Advanced Encryption Standard
A widely-used encryption method that helps protect digital information by scrambling it into unreadable form. It works using a symmetric key algorithm, meaning the same key is used for both encryption and decryption. 


## How It Works

![](/images/c4ad51b0-5ca0-499f-857f-819cf1d23347-image.png)

1. **Key generation**: A secret key is created, which can have different sizes (128, 192, or 256 bits). The key size determines the complexity of the encryption, with longer keys being more secure.

2. **Data representation**: The data you want to encrypt, called plaintext, is divided into equal-sized blocks (usually 128 bits). If the last block isn't full, it's padded with extra bits to fill it up.

![](/images/021076e4-56aa-4e72-97a1-5afe116ae504-image.png)


3. **Substitution**: Each block of plaintext goes through a series of transformations. The first step is to replace each byte (8 bits) of the block with a corresponding byte from a pre-defined substitution table (called the S-box). This helps to mix up the data and make it harder to crack.

4. **Row shifting**: The rows of the block are shifted by a certain number of positions. This further scrambles the data.

5. **Column mixing**: The columns of the block are mixed to create a more complex relationship between the plaintext and the ciphertext (the encrypted data).

6. **Key addition**: The secret key is combined with the block using bitwise XOR operation. This process is called the AddRoundKey step.

7. **Round repetition**: Steps 3 to 6 are repeated a certain number of times (called rounds). The number of rounds depends on the key size: 10 rounds for 128-bit keys, 12 rounds for 192-bit keys, and 14 rounds for 256-bit keys. Each round uses a unique round key derived from the original secret key.

8. **Final transformation**: After the last round, another substitution, row shifting, and key addition are performed to produce the final ciphertext.

9. **Ciphertext**: The scrambled data, or ciphertext, is now ready to be transmitted or stored securely. Only someone with the correct secret key can decrypt it back into the original plaintext.

When decrypting the data, the same process is performed in reverse order, using the same secret key to recover the original plaintext.

![](/images/79d64ff4-994a-4f99-925d-c7dbe1ace88a-image.png)
Each set of these four series of operations is considered one round. AES can have 10 to 14 rounds. This means that when you are looking for the encryption code inside of a binary, it will likely be a long function with a lot of repetitive-looking code. This is one aspect that can help you identify it as encryption code when looking though the binary.

## Attributes
**Symmetric Key Algorithm: **AES is a symmetric key algorithm, which means the same key is used for both encryption and decryption. This is different from asymmetric key algorithms, where two different keys (public and private keys) are used for encryption and decryption. Symmetric key algorithms are generally faster and more efficient for large amounts of data, but key management can be challenging, as securely sharing the key with the intended recipient is crucial.

**Security of AES:** AES is considered highly secure and is widely adopted for various applications, including government, military, and commercial use. The algorithm's security is primarily based on its key size, which makes it resistant to brute-force attacks. Brute-force attacks involve trying every possible key combination to decrypt the ciphertext, but with AES key sizes (128, 192, or 256 bits), the number of possible combinations is so large that it's currently considered infeasible to break AES encryption using this method.

**Modes of Operation:** AES operates on fixed-size blocks of data (128 bits). To encrypt data that doesn't fit into a single block, or to encrypt multiple blocks with added security, different modes of operation can be used, such as Electronic Codebook (ECB), Cipher Block Chaining (CBC), or Galois/Counter Mode (GCM). These modes define how the plaintext is divided into blocks and how the encryption process is applied to each block.

**Electronic Codebook (ECB):** This mode encrypts each block independently using the same key, which can result in patterns being visible in the ciphertext if the plaintext has repeating data. It's generally considered less secure and not recommended for most applications.

**Cipher Block Chaining (CBC):** This mode introduces a dependency between blocks by XORing the previous block's ciphertext with the current block's plaintext before encryption. An Initialization Vector (IV) is used for the first block to add randomness. This mode provides better security than ECB but can be susceptible to certain attacks if the IV is predictable or reused.

**Galois/Counter Mode (GCM):** This is an authenticated encryption mode that provides both confidentiality and data integrity. It combines the counter mode for encryption, which uses a unique counter value for each block, and the Galois mode for authentication. GCM is widely recommended for modern encryption applications.

## Source
https://www.malwarebytes.com/blog/news/2018/03/encryption-101-how-to-break-encryption