﻿using Domain.Mail;
using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface INotificationRepository
    {
        public Task<NotificationRequest> CreateNotification(NotificationRequest notification);
        public Task<IEnumerable<NotificationRequest>> GetAllActiveNotificationsForProduct(Guid productId);
        public Task<NotificationRequest> GetNotification(Guid notificationId);
        public Task<NotificationRequest> UpdateActiveNotification(Guid notificationId);
        public Task<IEnumerable<NotificationRequest>> UpdateNotifcationByEmail(string oldEmail, string newEmail);
        public Task<IEnumerable<NotificationRequest>> GetAllActiveNotificationsByEmail(string email);
        public Task<bool> DeleteNotification(Guid userId, Guid productId);
    }
}
