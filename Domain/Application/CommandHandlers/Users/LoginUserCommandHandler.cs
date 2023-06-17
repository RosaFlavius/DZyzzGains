﻿using Application.Commands.Users;
using Application.DTOs;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Users
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoggedInUserDTO>
    {
        private readonly IUserRepository _userRepo;

        public LoginUserCommandHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<LoggedInUserDTO> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUserByEmail(request.Email);
            var isUserLoggedIn = new LoggedInUserDTO();
            if (user is not null)
            {
                var encryptedPassword = EncryptPassword(request.Password);
                if (user.Password == encryptedPassword)
                {
                    isUserLoggedIn.LoggedIn = true;
                    return isUserLoggedIn;
                }
            }
            isUserLoggedIn.LoggedIn = false;
            return isUserLoggedIn;
        }

        private static string EncryptPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passBytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(passBytes);

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    builder.Append(hashBytes[i].ToString("x2")); // Convert each byte to hexadecimal format
                }

                return builder.ToString();
            }
        }
    }
}
