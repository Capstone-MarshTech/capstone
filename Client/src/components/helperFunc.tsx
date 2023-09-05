const formatLossbanding = (value) => {
  switch (value) {
    case "zero":
      return "zero";
    case "1 to 250":
      return "£1-£250";
    case "251 to 500":
      return "£251 - £500";
    case "501 to 1,000":
      return "£501-£1K";
    case "1,001 to 2,500":
      return "£1K-£2.5K";
    case "2,501 to 5,000":
      return "£2.5K-£5K";
    case "5,001 to 10,000":
      return "£5K-£10K";
    case "10,001 to 15,000":
      return "£10K-£15K";
    case "15,001 to 20,000":
      return "£15K-£20K";
    case "20,001 to 25,000":
      return "£20K-£25K";
    case "25,001 to 50,000":
      return "£25K-£50K";
    case "50,001 to 100,000":
      return "£50K-£100K";
    case "100,001 to 250,000":
      return "£100K-£250K";
    case "over 250,000":
      return ">£250K";
    default:
      return value;
  }
};

export default formatLossbanding;
