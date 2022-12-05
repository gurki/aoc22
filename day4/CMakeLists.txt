cmake_minimum_required( VERSION 3.14 FATAL_ERROR )

project(
    aoc-day4
    VERSION 0.0.0
    DESCRIPTION "Advent of Code 2022 - Day 4"
    LANGUAGES CXX
)

add_compile_definitions( ROOT_DIR="${CMAKE_CURRENT_SOURCE_DIR}" )

add_executable( ${PROJECT_NAME}
    day4.cpp
    interval.cpp
)

target_compile_features( ${PROJECT_NAME}
    PUBLIC
        cxx_std_20
)