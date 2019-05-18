﻿using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace Gamefication.DTO
{
    [ComplexType]
    public class Lot
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public LotType LotType { get; set; }

        [NotNull] public Quantity Quantity { get; set; }
    }
}