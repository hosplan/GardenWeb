using GardenWeb.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace GardenWeb.Helper
{
    public class HashService
    {
        public HashSalt EncryptionPassword(string rawPassword)
        {
            byte[] salt = new byte[128 / 8];
            using(var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            string hashPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                  password: rawPassword,
                  salt: salt,
                  prf: KeyDerivationPrf.HMACSHA256,
                  iterationCount: 100000,
                  numBytesRequested: 256 / 8
            ));

            return new HashSalt { SaltPassword = hashPassword, Salt = salt };
        }

        public string StoredSaltPassword(string rawPassword, byte[] storedSalt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                 password: rawPassword,
                 salt: storedSalt,
                 prf: KeyDerivationPrf.HMACSHA256,
                 iterationCount: 100000,
                 numBytesRequested: 256 / 8
           ));

        }
    }
}
