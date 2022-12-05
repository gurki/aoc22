#pragma once

#include <set>
#include <ostream>


struct Interval
{
    int left = std::numeric_limits<int>::min();
    int right = std::numeric_limits<int>::min();

    bool empty() const {
        return left > right;
    }

    bool valid() const {
        return left > std::numeric_limits<int>::min() && right > std::numeric_limits<int>::min();
    }
};

Interval intersect( const Interval&, const Interval& );     //  A^B
bool operator==( const Interval&, const Interval& );        //  A == B
std::ostream& operator<<( std::ostream& out, const Interval& iv );
