cmake_minimum_required( VERSION 3.20 FATAL_ERROR )

project(
    aoc-day6
    VERSION 0.0.0
    DESCRIPTION "Advent of Code 2022 - Day 6"
    LANGUAGES CXX
)

add_compile_definitions( ROOT_DIR="${CMAKE_CURRENT_SOURCE_DIR}" )

add_executable( ${PROJECT_NAME}
    day6.cpp
)

target_compile_features( ${PROJECT_NAME}
    PUBLIC
        cxx_std_23
)