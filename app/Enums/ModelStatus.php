<?php

namespace App\Enums;

enum ModelStatus: String {
    case Pending = 'Pending';
    case UnderReview = 'UnderReview';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case RequestChanges = 'RequestChanges';
}