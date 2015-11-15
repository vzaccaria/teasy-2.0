#include "CoreGraphicsHelpers.hpp"


int main(int argc, char *argv[])
{
    for(auto i = 0; i< 10000; i++ ) {
        getImageAsBufferResized(712, 400, 400);
    }
    return 0;
}
