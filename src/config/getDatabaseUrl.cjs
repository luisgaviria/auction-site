const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development:
        "postgres://vmtwpyub:D_Yorwj5Szrj0_2wfu9zdZ__r2HklzqR@batyr.db.elephantsql.com/vmtwpyub",
      test:
        "postgres://vmtwpyub:D_Yorwj5Szrj0_2wfu9zdZ__r2HklzqR@batyr.db.elephantsql.com/vmtwpyub",
      e2e: "postgres://vmtwpyub:D_Yorwj5Szrj0_2wfu9zdZ__r2HklzqR@batyr.db.elephantsql.com/vmtwpyub",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
