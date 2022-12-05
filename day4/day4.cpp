#include "interval.h"

#include <fstream>
#include <iostream>
#include <string>
#include <regex>


int main( const int, const char*[] )
{
    static const std::regex re( "(\\d+)-(\\d+),(\\d+)-(\\d+)" );

    std::ifstream fin( ROOT_DIR "/input.txt" );
    std::string line;
    std::smatch match;

    int containCount = 0;
    int overlapCount = 0;

    while ( std::getline( fin, line ) )
    {
        std::regex_match( line, match, re );
        const Interval ivA { std::stoi( match.str( 1 ) ), std::stoi( match.str( 2 ) ) };
        const Interval ivB { std::stoi( match.str( 3 ) ), std::stoi( match.str( 4 ) ) };
        const Interval ivAB = intersect( ivA, ivB );

        const bool contains = ( ivA == ivAB ) || ( ivB == ivAB );
        const bool overlaps = ivAB.valid();

        containCount += contains;
        overlapCount += overlaps;
    }

    std::cout << containCount << ", " << overlapCount;
    return EXIT_SUCCESS;
}