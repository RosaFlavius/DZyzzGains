using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Orders
{
    public class AddOrderCommand : IRequest<Order>
    {
        public AddOrderCommand()
        {
        }
        public double TotalPrice { get; set; }
    }
}
