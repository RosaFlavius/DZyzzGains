using Domain.Mail;
using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataDbContext _dbContext;

        public NotificationRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<NotificationRequest> CreateNotification(NotificationRequest notification)
        {
            _dbContext.Add(notification);
            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<IEnumerable<NotificationRequest>> GetAllActiveNotificationsForProduct(Guid productId)
        {
            return await _dbContext.Notifications.Where(active => active.IsUserNotified == false && active.ProductId == productId).ToListAsync();
        }

        public async Task<IEnumerable<NotificationRequest>> GetAllActiveNotificationsByEmail(string email)
        {
            return await _dbContext.Notifications.Where(notification => notification.UserEmail == email && notification.IsUserNotified == false).ToListAsync();
        }



        public async Task<IEnumerable<NotificationRequest>> UpdateNotifcationByEmail(string oldEmail, string newEmail)
        {
            var notifications = await GetAllActiveNotificationsByEmail(oldEmail);
            var activeNotifications = notifications.ToList();
            if (notifications is null)
            {
                return null;
            }
            foreach (var n in activeNotifications)
            {
                var index = activeNotifications.FindIndex(i => i.NotificationId == n.NotificationId);
                activeNotifications[index].UserEmail = newEmail;
            }
            foreach (var n in activeNotifications)
            {

                _dbContext.Notifications.Update(n);

            }
            await _dbContext.SaveChangesAsync();
            return activeNotifications;

        }

        public async Task<NotificationRequest> UpdateActiveNotification(Guid notificationId)
        {
            var notification = await GetNotification(notificationId);
            if (notification is null)
            {
                return null;
            }
            notification.IsUserNotified = true;
            _dbContext.Notifications.Update(notification);

            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<bool> DeleteNotification(Guid userId, Guid productId)
        {
            var notification = await _dbContext.Notifications.SingleOrDefaultAsync(item => item.UserId == userId && item.ProductId == productId);
            if (notification != null)
            {
                _dbContext.Remove(notification);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<NotificationRequest> GetNotification(Guid notificationId)
        {
            return await _dbContext.Notifications.FirstOrDefaultAsync(not => not.NotificationId == notificationId);
        }



    }
}
