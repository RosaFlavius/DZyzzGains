using Application.Commands;
using Application.Repositories;
using Domain.RepositoryPattern;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers
{
    public class AddUserCommandHandler : IRequestHandler<AddUserCommand, User>
    {
        private readonly IUserRepository _userRepo;
        public AddUserCommandHandler(IUserRepository userRepo) 
        {
            _userRepo = userRepo;
        }
        public async Task<User> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = request.FirstName,  
                LastName = request.LastName,
                Email = request.Email,
                Password = EncryptPassword(request.Password),
                DateOfBirth = request.DateOfBirth,
                Phone = request.Phone,
                Country = request.Country,
                City = request.City,
                Address = request.Address,
                Admin = request.Admin,
            };

            _userRepo.AddUser(user);
            await _userRepo.SaveChangesAsync();
            return user;
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
