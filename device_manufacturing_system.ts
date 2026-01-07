interface Device {
  specifications(): void;
}

class AppleLaptop implements Device {
  specifications(): void {
    console.log("Apple Laptop: macOS, M2 Chip, 16GB RAM, 512GB SSD");
  }
}

class ApplePhone implements Device {
  specifications(): void {
    console.log("Apple Phone: iOS, A16 Bionic, 128GB Storage");
  }
}

class SamsungLaptop implements Device {
  specifications(): void {
    console.log("Samsung Laptop: Windows 11, Intel i7, 16GB RAM, 1TB SSD");
  }
}

class SamsungPhone implements Device {
  specifications(): void {
    console.log("Samsung Phone: Android, Snapdragon 8 Gen 2, 256GB Storage");
  }
}

interface DeviceFactory {
  createDevice(type: "Laptop" | "Phone"): Device;
}

class AppleFactory implements DeviceFactory {
  createDevice(type: "Laptop" | "Phone"): Device {
    if (type === "Laptop") return new AppleLaptop();
    if (type === "Phone") return new ApplePhone();
    throw new Error("Unknown device type");
  }
}

class SamsungFactory implements DeviceFactory {
  createDevice(type: "Laptop" | "Phone"): Device {
    if (type === "Laptop") return new SamsungLaptop();
    if (type === "Phone") return new SamsungPhone();
    throw new Error("Unknown device type");
  }
}

function main() {
  const appleFactory = new AppleFactory();
  const samsungFactory = new SamsungFactory();

  const appleLaptop = appleFactory.createDevice("Laptop");
  const samsungPhone = samsungFactory.createDevice("Phone");

  appleLaptop.specifications();
  samsungPhone.specifications();
}

main();
