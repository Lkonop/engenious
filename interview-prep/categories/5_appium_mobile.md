# Category 5: Mobile Testing & Appium Essentials (10 Questions)

## 1. What is the Appium architecture?
**Answer:** Client-Server model. Code (Client) sends HTTP commands via JSON Wire Protocol to the Appium Server (Node.js), which uses drivers (XCUITest/UiAutomator2) to control the device.

## 2. What are "Desired Capabilities"?
**Answer:** JSON keys sent to the server to define the session (e.g., `platformName`, `deviceName`, `app` path, `automationName`).

## 3. Mobile Locator Strategies.
**Answer:** 
- **Accessibility ID:** Best for cross-platform.
- **ID / resource-id:** Android-specific.
- **iOS Class Chain:** Fast for iOS.
- **Xpath:** Slowest, use as a last resort.

## 4. Native vs. Web vs. Hybrid apps.
**Answer:** 
- **Native:** Built for OS (Swift/Kotlin).
- **Web:** Mobile browser sites.
- **Hybrid:** Web view inside a native container.

## 5. How do you handle mobile gestures?
**Answer:** I use the **Actions API** to define sequences of touch events (e.g., move to (x,y), press, move to (x2,y2), release) for swiping and scrolling.

## 6. What is the "Appium Inspector"?
**Answer:** A GUI tool used to record actions, inspect the mobile element hierarchy, and find locators. It's the "DevTools" of mobile automation.

## 7. Implicit vs. Explicit waits in Appium.
**Answer:** 
- **Implicit:** Global timeout for all elements. 
- **Explicit:** Better practice; waits for a specific condition (e.g., `visibilityOf`) for a specific element.

## 8. iOS vs. Android Automation: Key differences.
**Answer:** 
- **Drivers:** UiAutomator2 (Android) vs. XCUITest (iOS). 
- **Packaging:** APK (Android) vs. IPA/APP (iOS). 
- **Locators:** resource-id (Android) vs. predicate/class-chain (iOS).

## 9. How do you test apps on Real Devices vs. Emulators?
**Answer:** 
- **Emulators/Simulators:** Faster for CI and early dev. 
- **Real Devices:** Essential for performance, battery, camera, and network-related tests. I use cloud services like **BrowserStack** for scale.

## 10. What are the challenges of Hybrid App testing?
**Answer:** Switching **Contexts**. You must switch the driver from the `NATIVE_APP` context to the `WEBVIEW` context to interact with elements inside the web container.
