#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RCTPushy.h"  // <-- import头文件，注意要放到if条件外面

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"RedBookRn";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // 把这里非DEBUG的情况替换为热更新bundle的写法
  return [RCTPushy bundleURL];
#endif
}
@end
