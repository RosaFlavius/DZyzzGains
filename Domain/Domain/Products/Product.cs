using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{

    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }
        public string Img { get; set; }

        public ProductCategory Category { get; set; }

        public ICollection<OrderProducts> Orders { get; set; } = new List<OrderProducts>();

        public enum ProductCategory
        {
            Supplements = 1,
            Equipment = 2,
            Clothes = 3,
        }

        public bool InStock { get; set; }
        public Product(string name, ProductCategory category ,string description, string brand, float price, string img, bool inStock)
        {
            Name = name;
            Description = description;
            Brand = brand;
            Price = price;
            Category = category;
            Img = img;
            InStock = inStock;
        }

        public Product()
        {

        }
        


    }


}
