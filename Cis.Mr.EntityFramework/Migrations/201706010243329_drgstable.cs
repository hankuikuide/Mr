namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class drgstable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TbBenefitgroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassName = c.String(unicode: false),
                        Flag = c.String(unicode: false),
                        LoadDate = c.DateTime(nullable: false, precision: 0),
                        ParentClassId = c.String(unicode: false),
                        Sort = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TbBenefitplans",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassName = c.String(unicode: false),
                        Flag = c.String(unicode: false),
                        LoadDate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TbClaimtypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassName = c.String(unicode: false),
                        PId = c.String(unicode: false),
                        Flag = c.String(unicode: false),
                        LoadDate = c.DateTime(precision: 0),
                        Clientclassid = c.String(unicode: false),
                        Sort = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TbHospitals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        PLevel = c.String(unicode: false),
                        Type = c.String(unicode: false),
                        AreaId = c.String(unicode: false),
                        Flag = c.String(unicode: false),
                        LoadDate = c.DateTime(nullable: false, precision: 0),
                        HType = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TbPatients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        BenefitgroupId = c.String(unicode: false),
                        AreaId = c.String(unicode: false),
                        Gender = c.String(unicode: false),
                        Dob = c.DateTime(precision: 0),
                        Bmino = c.String(unicode: false),
                        IdType = c.String(unicode: false),
                        IdNumber = c.String(unicode: false),
                        Flag = c.String(unicode: false),
                        LoadDate = c.DateTime(precision: 0),
                        Company = c.String(unicode: false),
                        SciCardNo = c.String(unicode: false),
                        SciCardIdentified = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TdMrLeaveHospitals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MedicalId = c.String(unicode: false),
                        DischargeOutcome = c.String(unicode: false),
                        OperId = c.String(unicode: false),
                        OperDate = c.DateTime(precision: 0),
                        LeaveHospitalStatus = c.String(unicode: false),
                        DtProcess = c.String(unicode: false),
                        HospitalizationSituation = c.String(unicode: false),
                        LeaveDoctorAdvice = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TdMrMedicals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HosptialId = c.String(unicode: false),
                        AdmissionNo = c.String(unicode: false),
                        OutBedNum = c.String(unicode: false),
                        AdmissionDate = c.DateTime(nullable: false, precision: 0),
                        DischargeDate = c.DateTime(nullable: false, precision: 0),
                        DoctorCode = c.String(unicode: false),
                        IsDrugAllergy = c.String(unicode: false),
                        AllergyDrugCode = c.String(unicode: false),
                        AllergyDrugName = c.String(unicode: false),
                        PathologyCode = c.String(unicode: false),
                        IsHospitalInfected = c.String(unicode: false),
                        HospitalInfectedCode = c.String(unicode: false),
                        BloodTypeS = c.String(unicode: false),
                        BloodTypeE = c.String(unicode: false),
                        LeaveHospitalType = c.String(unicode: false),
                        Height = c.String(unicode: false),
                        Weight = c.String(unicode: false),
                        Marriage = c.String(unicode: false),
                        BearPregnancy = c.String(unicode: false),
                        BearYie = c.String(unicode: false),
                        AdmissionDiseaseId = c.String(unicode: false),
                        AdmissionDiseaseName = c.String(unicode: false),
                        DischargeDiseaseId = c.String(unicode: false),
                        DischargeDiseaseName = c.String(unicode: false),
                        OperId = c.String(unicode: false),
                        OperDate = c.DateTime(precision: 0),
                        IsUpload = c.String(unicode: false),
                        IsValid = c.String(unicode: false),
                        Operator = c.String(unicode: false),
                        OperatingDate = c.DateTime(precision: 0),
                        Tsblbs = c.String(unicode: false),
                        DiagnosePosition1 = c.String(unicode: false),
                        DiagnosePosition2 = c.String(unicode: false),
                        DoctorName = c.String(unicode: false),
                        IsPathologicalExamination = c.String(unicode: false),
                        DiagnosisCode1 = c.String(unicode: false),
                        DiagnosisName1 = c.String(unicode: false),
                        DiagnosisCode2 = c.String(unicode: false),
                        DiagnosisName2 = c.String(unicode: false),
                        DiagnosisCode3 = c.String(unicode: false),
                        DiagnosisName3 = c.String(unicode: false),
                        DiagnosisCode4 = c.String(unicode: false),
                        DiagnosisName4 = c.String(unicode: false),
                        DiagnosisCode5 = c.String(unicode: false),
                        DiagnosisName5 = c.String(unicode: false),
                        DiagnosisCode6 = c.String(unicode: false),
                        DiagnosisName6 = c.String(unicode: false),
                        DiagnosisCode7 = c.String(unicode: false),
                        DiagnosisName7 = c.String(unicode: false),
                        DiagnosisCode8 = c.String(unicode: false),
                        DiagnosisName8 = c.String(unicode: false),
                        DiagnosisCode9 = c.String(unicode: false),
                        DiagnosisName9 = c.String(unicode: false),
                        DiagnosisCode10 = c.String(unicode: false),
                        DiagnosisName10 = c.String(unicode: false),
                        DiagnosisCode11 = c.String(unicode: false),
                        DiagnosisName11 = c.String(unicode: false),
                        DiagnosisCode12 = c.String(unicode: false),
                        DiagnosisName12 = c.String(unicode: false),
                        DiagnosisCode13 = c.String(unicode: false),
                        DiagnosisName13 = c.String(unicode: false),
                        DiagnosisCode14 = c.String(unicode: false),
                        DiagnosisName14 = c.String(unicode: false),
                        DiagnosisCode15 = c.String(unicode: false),
                        DiagnosisName15 = c.String(unicode: false),
                        DiagnosisCode16 = c.String(unicode: false),
                        DiagnosisName16 = c.String(unicode: false),
                        NewbornDate = c.DateTime(precision: 0),
                        NewbornWeight = c.Decimal(precision: 18, scale: 2),
                        NewbornCurrentWeight = c.Decimal(precision: 18, scale: 2),
                        IsUploadDate = c.DateTime(precision: 0),
                        IsFinalGrouped = c.String(unicode: false),
                        IsGrouped = c.String(unicode: false),
                        PatientId = c.String(unicode: false),
                        DataValidateRemark = c.String(unicode: false),
                        DataValidateFlag = c.Decimal(nullable: false, precision: 18, scale: 2),
                        BloodTransHistory = c.String(unicode: false),
                        SurgeryHistory = c.String(unicode: false),
                        MedicalHistory = c.String(unicode: false),
                        ChiefComplaint = c.String(unicode: false),
                        IsGroupAvailable = c.String(unicode: false),
                        IsSmRefreshed = c.String(unicode: false),
                        SmRefreshDate = c.DateTime(precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TdSmBills",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AreaCode = c.String(unicode: false),
                        Hisid = c.String(unicode: false),
                        Billdate = c.DateTime(nullable: false, precision: 0),
                        HospitalId = c.String(unicode: false),
                        HospitalName = c.String(unicode: false),
                        HospitalFeeId = c.String(unicode: false),
                        HospitalFeeName = c.String(unicode: false),
                        HospitalOutName = c.String(unicode: false),
                        PatientId = c.String(unicode: false),
                        PatientName = c.String(unicode: false),
                        PatientSex = c.String(unicode: false),
                        PatientBirth = c.DateTime(precision: 0),
                        BenefitType = c.String(unicode: false),
                        BenefitGroupId = c.String(unicode: false),
                        ClaimType = c.String(unicode: false),
                        UnusualFlag = c.String(unicode: false),
                        AdmissionDiseaseId = c.String(unicode: false),
                        DischargeDiseaseId = c.String(unicode: false),
                        DischargeReason = c.String(unicode: false),
                        DiseaseId = c.String(unicode: false),
                        SecondDiseaseId = c.String(unicode: false),
                        ThirdDiseaseId = c.String(unicode: false),
                        DiagnosisFour = c.String(unicode: false),
                        DiagnosisFive = c.String(unicode: false),
                        DiagnosisSix = c.String(unicode: false),
                        DiagnosisSeven = c.String(unicode: false),
                        DiagnosisEight = c.String(unicode: false),
                        DiagnosisNine = c.String(unicode: false),
                        DiagnosisTen = c.String(unicode: false),
                        DiagnosisEleven = c.String(unicode: false),
                        DiagnosisTwelve = c.String(unicode: false),
                        DiagnosisThirteen = c.String(unicode: false),
                        DiagnosisFourteen = c.String(unicode: false),
                        DiagnosisFifteen = c.String(unicode: false),
                        DiagnosisSixteen = c.String(unicode: false),
                        AdmissionDate = c.DateTime(precision: 0),
                        DischargeDate = c.DateTime(precision: 0),
                        FirstDate = c.DateTime(precision: 0),
                        DiseaseType = c.String(unicode: false),
                        SpecialDiseaseCode = c.String(unicode: false),
                        PatientPregnant = c.String(unicode: false),
                        PatientLactating = c.String(unicode: false),
                        PatientHeight = c.String(unicode: false),
                        PatientWeight = c.String(unicode: false),
                        InPatientTransferFlag = c.String(unicode: false),
                        BillNo = c.String(unicode: false),
                        BmiCode = c.String(unicode: false),
                        TotalAmount = c.Decimal(precision: 18, scale: 2),
                        BmiConveredAmount = c.Decimal(precision: 18, scale: 2),
                        YdBenefitGroupName = c.String(unicode: false),
                        YdBenefitRegion = c.String(unicode: false),
                        Tradeno = c.String(unicode: false),
                        AdmissionNumber = c.String(unicode: false),
                        SpecifiedDiseases = c.String(unicode: false),
                        Modelworker = c.String(unicode: false),
                        LoginDate = c.DateTime(precision: 0),
                        WipedMoney = c.Decimal(precision: 18, scale: 2),
                        CashPay = c.Decimal(precision: 18, scale: 2),
                        Billym = c.String(unicode: false),
                        BmiNopay = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Longterm = c.Decimal(precision: 18, scale: 2),
                        Isunijunction = c.String(unicode: false),
                        BaseAccountMonty = c.Decimal(precision: 18, scale: 2),
                        SupplementMoney = c.Decimal(precision: 18, scale: 2),
                        BaseAccountMontyY = c.Decimal(precision: 18, scale: 2),
                        SupplementMoneyY = c.Decimal(precision: 18, scale: 2),
                        SupplementPubMoney = c.Decimal(precision: 18, scale: 2),
                        LargeAmountMoney = c.Decimal(precision: 18, scale: 2),
                        Md5value = c.String(unicode: false),
                        Deptname = c.String(unicode: false),
                        DrgsRejectmoney = c.Decimal(precision: 18, scale: 2),
                        RejectPoint = c.Decimal(precision: 18, scale: 2),
                        SelfPayMoney = c.Decimal(precision: 18, scale: 2),
                        SelfCareMoney = c.Decimal(precision: 18, scale: 2),
                        FundType = c.String(unicode: false),
                        SNumber01 = c.Decimal(precision: 18, scale: 2),
                        SNumber02 = c.Decimal(precision: 18, scale: 2),
                        SNumber03 = c.Decimal(precision: 18, scale: 2),
                        SNumber04 = c.Decimal(precision: 18, scale: 2),
                        SNumber05 = c.Decimal(precision: 18, scale: 2),
                        SNumber06 = c.Decimal(precision: 18, scale: 2),
                        SNumber07 = c.Decimal(precision: 18, scale: 2),
                        SNumber08 = c.Decimal(precision: 18, scale: 2),
                        SNumber09 = c.Decimal(precision: 18, scale: 2),
                        SNumber10 = c.Decimal(precision: 18, scale: 2),
                        SNumber11 = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TdSmBills");
            DropTable("dbo.TdMrMedicals");
            DropTable("dbo.TdMrLeaveHospitals");
            DropTable("dbo.TbPatients");
            DropTable("dbo.TbHospitals");
            DropTable("dbo.TbClaimtypes");
            DropTable("dbo.TbBenefitplans");
            DropTable("dbo.TbBenefitgroups");
        }
    }
}
