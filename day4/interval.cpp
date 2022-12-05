#include "interval.h"
#include <algorithm>
#include <iostream>


////////////////////////////////////////////////////////////////////////////////
bool operator==( const Interval& iv1, const Interval& iv2 ) {
    return ( iv1.left == iv2.left ) && ( iv1.right == iv2.right );
}


////////////////////////////////////////////////////////////////////////////////
Interval intersect( const Interval& a, const Interval& b )
{
    if ( b.left > a.right || a.left > b.right ) {
        return {};
    }

    return {
        std::max( a.left, b.left ),
        std::min( a.right, b.right )
    };
};


////////////////////////////////////////////////////////////////////////////////
std::ostream& operator<<( std::ostream& out, const Interval& iv ) {
    out << "[ " << iv.left << ", " << iv.right<< " ]";
    return out;
}