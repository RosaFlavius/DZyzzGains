﻿using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Users
{
    public class LoginUserCommand : IRequest<LoggedInUserDTO>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
