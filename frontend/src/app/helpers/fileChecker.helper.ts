export function fileChecker(that: any, fileEvent: any) {
  const reader = new FileReader();

  if (fileEvent.target.files && fileEvent.target.files.length) {
    const [file] = fileEvent.target.files;

    if (
      !['image/jpeg', 'image/png'].includes(file.type) ||
      file.size > 10000000
    ) {
      that.fileError = true;
    } else {
      that.fileError = false;
    }

    reader.onload = () => {
      that.imageSrc = file;
    };

    reader.readAsDataURL(file);
  }
}
