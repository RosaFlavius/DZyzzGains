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
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private readonly IUserRepository _userRepo;
        private readonly INotificationRepository _notificationRepo;

        public UpdateUserCommandHandler(IUserRepository userRepo, INotificationRepository notificationRepo)
        {
            _userRepo = userRepo;
            _notificationRepo = notificationRepo;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(request.Id);
            await _notificationRepo.UpdateNotifcationByEmail(user.Email, request.Email);
            user.UserId = request.Id;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Password = EncryptPassword(request.Password);
            user.DateOfBirth = request.DateOfBirth;
            user.Phone = request.Phone;
            user.Country = request.Country;
            user.City = request.City;
            user.Address = request.Address;
            user.Admin = user.Admin;

            User result = _userRepo.UpdateUser(user);
            await _userRepo.SaveChangesAsync();
            return await Task.FromResult(result);
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
