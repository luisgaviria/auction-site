const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development:
        "postgresql://postgres.qbrbxjjrnbbpgdkdimnu:Auctionandcompany.com!@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
      test:
        "postgresql://postgres.qbrbxjjrnbbpgdkdimnu:Auctionandcompany.com!@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
      e2e: "postgresql://postgres.qbrbxjjrnbbpgdkdimnu:Auctionandcompany.com!@aws-0-us-west-1.pooler.supabase.com:6543/postgres",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
