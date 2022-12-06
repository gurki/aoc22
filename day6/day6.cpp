#include <fstream>
#include <iostream>
#include <ranges>
#include <algorithm>
#include <set>


int main( const int, const char*[] )
{
    std::ifstream fin( ROOT_DIR "/input.txt" );
    std::string buffer;
    fin >> buffer;

    static const auto isUnique = []( const auto& items ) {
        const std::set<char> uniques( items.begin(), items.end() );
        return uniques.size() == items.size();
    };

    static const int width = 14;    //  partA: 4; partB: 14
    const auto slides = buffer | std::views::slide( width );
    const auto iter = std::ranges::find_if( slides, isUnique );
    const auto id = std::ranges::distance( slides.begin(), iter ) + width;

    std::cout << id << "\n";
    return EXIT_SUCCESS;
}